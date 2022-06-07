interface Props {
  message: string;
}

function ErrorBanner({ message }: Props) {
  return (
    <div data-testid='error-banner' style={{ backgroundColor: 'red', color: 'white'}}>
      {message || '에러입니다'}
    </div>
  )
}

export default ErrorBanner