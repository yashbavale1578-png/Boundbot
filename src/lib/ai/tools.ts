import OpenAI from "openai";

export const boundbotTools: OpenAI.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "create_role",
      description: "Creates a new role in the server",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          color: { type: "number" }
        },
        required: ["name"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "delete_role",
      description: "Deletes a role from the server",
      parameters: {
        type: "object",
        properties: {
          roleId: { type: "string" }
        },
        required: ["roleId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "assign_role",
      description: "Assigns a role to a member",
      parameters: {
        type: "object",
        properties: {
          userId: { type: "string" },
          roleId: { type: "string" },
          reason: { type: "string" }
        },
        required: ["userId", "roleId"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "approve_request",
      description: "Approves a pending role request",
      parameters: {
        type: "object",
        properties: {
          requestId: { type: "string" }
        },
        required: ["requestId"]
      }
    }
  }
];
