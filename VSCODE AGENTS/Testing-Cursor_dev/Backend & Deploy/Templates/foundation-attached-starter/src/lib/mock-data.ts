export const starterFallback = {
  page: {
    title: "Foundation Attached Starter",
    description:
      "Fallback content used when Foundation Core is offline during local template work.",
    sections: [
      {
        id: "hero",
        kind: "hero",
        title: "Start with the contract, then replace the visuals from screenshots.",
        body: "This starter proves the attach boundary and keeps local progress moving even without the foundation runtime online.",
      },
      {
        id: "value",
        kind: "value",
        title: "Mock mode mirrors the attach contract shape.",
        body: "Downstream screenshot builds can move from local placeholders to real runtime data without refactoring page composition.",
      },
      {
        id: "proof",
        kind: "proof",
        title: "Templates stay separate from the DS lane.",
        body: "This starter is a standalone Next.js root that consumes normalized content surfaces only.",
      },
    ],
  },
  healthStatus: "mock-fallback",
  authMode: "anonymous_fallback",
};