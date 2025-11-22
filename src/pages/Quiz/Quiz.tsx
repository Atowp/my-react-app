import { useState } from "react";

type QuizStatus = "typing" | "submitting" | "success" | "error";

function Quiz() {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<ErrorConstructor | null>(null);
  const [status, setStatus] = useState<QuizStatus>("typing");

  if (status === "success") {
    return <h1>That's right!</h1>;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitForm(answer);
      setStatus("success");
    } catch (err) {
      setStatus("typing");
      setError(err as ErrorConstructor);
    }
  }

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setAnswer(e.target.value);
  }

  return (
    <>
      <h2>City quiz</h2>
      <p>
        In which city is there a billboard that turns air into drinkable water?
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === "submitting"}
        ></textarea>
        <br />
        <button disabled={status === "submitting" || answer.trim() === ""}>
          submit
        </button>
        {error !== null && <p className="text-red-500">{error.message}</p>}
      </form>
    </>
  );
}

function submitForm(answer: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldError = answer.toLowerCase() !== "lima";
      if (shouldError) {
        reject(new Error("Incorrect answer"));
      } else {
        resolve("Correct answer");
      }
    }, 1500);
  });
}

export default Quiz;
