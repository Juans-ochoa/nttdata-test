interface Props {
  message: string;
  error: true;
}

export const ErrorInput = ({ message, error }: Props) => {
  return (
    <>
      {message !== "" && error && (
        <div className='invalid-feedback'>{message}</div>
      )}
    </>
  );
};
