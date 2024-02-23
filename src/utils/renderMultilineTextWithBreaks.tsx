const renderMultilineTextWithBreaks = (review: string) => {
  return (
    <>
      {review.split("\n").map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ))}
    </>
  );
};

export default renderMultilineTextWithBreaks;
