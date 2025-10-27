interface ForecastPrompt {
  render: (transcript: string) => string;
}

const forecastPrompt: ForecastPrompt = {
  render: (transcript) =>
    [
      "Decision: Review with finance advisor",
      "Rationale: Conversation transcript indicates open financial questions.",
      transcript.trim(),
      "Confidence: medium",
    ].join("\n"),
};

export function getForecastPrompt(): ForecastPrompt {
  return forecastPrompt;
}
