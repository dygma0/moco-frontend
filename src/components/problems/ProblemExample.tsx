interface ProblemExampleProps {
  index: number;
  input: string;
  output: string;
  explanation?: string;
}

export function ProblemExample({
  index,
  input,
  output,
  explanation,
}: ProblemExampleProps) {
  return (
    <article className="mt-4 p-4 bg-[#f8f8f6] rounded-lg">
      <h3 className="font-medium text-[#333]">Example {index + 1}:</h3>
      <div className="mt-2 space-y-2">
        <p>
          <strong>Input:</strong> <code className="font-mono">{input}</code>
        </p>
        <p>
          <strong>Output:</strong> <code className="font-mono">{output}</code>
        </p>
        {explanation && (
          <p>
            <strong>Explanation:</strong> {explanation}
          </p>
        )}
      </div>
    </article>
  );
}
