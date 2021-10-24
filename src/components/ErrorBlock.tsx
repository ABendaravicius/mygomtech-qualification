import {FC, memo} from 'react';

interface IErrorBlock {
  error: String
}

const ErrorBlock: FC<IErrorBlock> = ({error}) => {
  if (!error) {
    return null;
  }

  return (
    <div className={'sm-text text-center error'}>
      {error}
    </div>
  )
}

export default memo(ErrorBlock);
