/**
 * Content for the Interactive Lab. Everything here is an illustrative walkthrough of how data
 * moves through each type of system. No model runs in the browser and the sample values are made up.
 */
export type Stage = { short: string; title: string; text: string; sample: string };
export type Scenario = { id: string; label: string; blurb: string; stages: Stage[] };

export const scenarios: Scenario[] = [
  {
    id: "rag",
    label: "Retrieval (RAG)",
    blurb: "Answer a question using your own documents.",
    stages: [
      { short: "Input", title: "Input data", text: "A question arrives, along with a knowledge base of documents such as troubleshooting guides.", sample: "Question: “Modem shows no signal after a restart”" },
      { short: "Process", title: "Processing", text: "Documents are cleaned and split into small chunks so each piece covers one idea.", sample: "Guide → 120 chunks of about 200 words" },
      { short: "Embed", title: "Embeddings", text: "Each chunk and the question become vectors, lists of numbers where similar meaning sits close together.", sample: "[0.12, −0.48, 0.31, …]" },
      { short: "Retrieve", title: "Retrieval", text: "The system finds the chunks whose vectors are closest to the question's vector.", sample: "Top 3 chunks by similarity" },
      { short: "Output", title: "AI output", text: "A language model drafts an answer that is grounded in the retrieved chunks instead of guessing.", sample: "Answer + the source chunks it used" },
    ],
  },
  {
    id: "cv",
    label: "Detection (YOLO)",
    blurb: "Find and count defects in an image.",
    stages: [
      { short: "Input", title: "Input data", text: "Images of the part arrive from a camera or a folder, along with labelled examples used for training.", sample: "Image: metal plate, 1280×720" },
      { short: "Process", title: "Processing", text: "Images are resized and normalised. During training, defects are annotated with boxes.", sample: "Resize → normalise → annotate" },
      { short: "Model", title: "Detection model", text: "A YOLO model, fine-tuned with transfer learning, looks at the whole image in a single pass.", sample: "One forward pass over the image" },
      { short: "Detect", title: "Detection", text: "The model proposes boxes with confidence scores, and low-confidence boxes are filtered out.", sample: "Boxes above a confidence threshold" },
      { short: "Output", title: "Result", text: "Detections are counted and exported in a structured format other systems can read.", sample: "JSON: count and box coordinates" },
    ],
  },
  {
    id: "ml",
    label: "Prediction (ML)",
    blurb: "Predict an outcome from tabular data.",
    stages: [
      { short: "Input", title: "Input data", text: "Historical records arrive as a table, one row per customer, with the outcome you want to predict.", sample: "Rows: customers · Columns: behaviour" },
      { short: "Process", title: "Processing", text: "Data is cleaned and new features are engineered from the raw columns.", sample: "Clean → encode → engineer features" },
      { short: "Model", title: "Model", text: "Models such as Logistic Regression or Random Forest learn patterns, then get tuned and compared.", sample: "Train → tune → compare" },
      { short: "Predict", title: "Prediction", text: "For a new customer, the model scores how likely the outcome is, such as churn or default.", sample: "Score between 0 and 1" },
      { short: "Output", title: "Decision support", text: "The score and the factors behind it help a person decide what to do next.", sample: "Risk level + top drivers" },
    ],
  },
];
