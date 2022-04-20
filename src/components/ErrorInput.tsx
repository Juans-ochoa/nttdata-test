interface Props {
  errorMessge: {
    message: string;
    error: true;
  };
}

export const ErrorInput = ({ errorMessge }: Props) => {
  return (
    <>
      {errorMessge.message !== "" && errorMessge.error && (
        <div className='invalid-feedback'>{errorMessge.message}</div>
      )}
    </>
  );
};
