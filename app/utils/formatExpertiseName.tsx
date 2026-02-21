export const formatExpertiseName = (name: string) => {
  const parts = name.trim().split(' ');

  if (parts.length === 1) {
    const word = parts[0];

    const start = Math.floor(Math.random() * (word.length - 2)) + 1;

    const normal = word.slice(0, start);
    const bold = word.slice(start);

    return (
      <>
        {normal}
        <span className="font-bold">{bold}</span>
      </>
    );
  }

  const lastWord = parts.pop();
  const firstPart = parts.join('');

  return (
    <>
      {firstPart}
      <span className="font-bold">{lastWord}</span>
    </>
  );
};
