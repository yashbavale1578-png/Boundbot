import { Octokit } from "octokit";

export const getOctokit = () => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("GITHUB_TOKEN_MISSING");
  }
  return new Octokit({ auth: token });
};

export const getRepoDetails = () => {
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  if (!owner || !repo) {
    throw new Error("GITHUB_REPO_DETAILS_MISSING");
  }
  return { owner, repo };
};

export const readJsonFile = async <T>(path: string): Promise<{ data: T | null; sha: string | null }> => {
  const octokit = getOctokit();
  const { owner, repo } = getRepoDetails();

  try {
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      headers: {
        'If-None-Match': ''
      }
    });

    if (Array.isArray(response.data) || response.data.type !== "file") {
      throw new Error("EXPECTED_FILE_NOT_DIRECTORY");
    }

    if (!("content" in response.data) || !("sha" in response.data)) {
      return { data: null, sha: null };
    }

    const content = Buffer.from(response.data.content, "base64").toString("utf8");
    return { data: JSON.parse(content) as T, sha: response.data.sha };
  } catch (error: any) {
    if (error.status === 404) {
      return { data: null, sha: null };
    }
    throw error;
  }
};

export const writeJsonFile = async <T>(path: string, data: T, message: string, sha: string | null, retries = 3): Promise<string> => {
  const octokit = getOctokit();
  const { owner, repo } = getRepoDetails();
  
  const content = Buffer.from(JSON.stringify(data, null, 2)).toString("base64");

  let currentSha = sha;
  let attempts = 0;

  while (attempts < retries) {
    try {
      const params: any = {
        owner,
        repo,
        path,
        message,
        content,
      };

      if (currentSha) {
        params.sha = currentSha;
      }

      const response = await octokit.rest.repos.createOrUpdateFileContents(params);
      return response.data.content?.sha || "";
    } catch (error: any) {
      if (error.status === 409) {
        attempts++;
        const currentData = await readJsonFile<T>(path);
        currentSha = currentData.sha;
        continue;
      }
      throw error;
    }
  }
  throw new Error("MAX_RETRIES_EXCEEDED");
};
