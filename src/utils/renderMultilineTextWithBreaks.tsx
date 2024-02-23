export default (review: string) => {
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
