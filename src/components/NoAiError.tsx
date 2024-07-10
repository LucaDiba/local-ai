export function NoAiError() {
  return (
    <div>
      <p>Sorry, the AI service is not available in your browser.</p>
      <p>
        To start using the AI service:
        <ul className="list-disc list-inside">
          <li>
            Download the latest version of Chrome Dev{" "}
            <a
              href="https://www.google.com/chrome/dev/"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline"
            >
              from here
            </a>{" "}
            (note: this is the development version of Chrome, not the standard
            version).
          </li>
          <li>
            Go to chrome://flags, search for "Prompt API for Gemini Nano", and
            select "Enabled".
          </li>
          <li>
            Go to chrome://flags, search for "Enables optimization guide on
            device", and select "Enabled ByPassPerfRequirement".
          </li>
          <li>
            Go to chrome://components, search for "Optimization Guide On Device
            Model".
          </li>
          <ul>
            <li>
              If you don't see the component, restart Chrome (even multiple
              times, until you see it).
            </li>
            <li>
              If you see it, click on "Check for update" (note: this will
              download a model with a size of around 1.5GB).
            </li>
          </ul>
        </ul>
      </p>
    </div>
  );
}
