import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { cx } from '~/common/utils'

export interface IModalProps {
  title: string;
  children: ReactNode;
  onSubmit: () => void;
  close: () => void;
  submitButtonText?: string;
  disabled?: boolean;
  btnClass?: string;
  buttons?: ReactNode[]
}

export const Modal = ({title, onSubmit, close, children, submitButtonText, disabled, btnClass, buttons}: IModalProps) => {

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  return (
    <>
      <div className='modal__overlay' onClick={close} />
      <div className='modal'>
        <h3 className='modal__title'>{title}</h3>
        <div className='modal__content'>
          {children}
        </div>
        <div className='modal__buttons'>
          {buttons
            ? buttons
            : (<>
              <button onClick={close}>Cancel</button>
              <button
                className={cx('button--primary', btnClass)}
                onClick={onSubmit}
                disabled={disabled}
              >
                {submitButtonText ?? 'Submit'}
              </button>
            </>)}
        </div>
      </div>
    </>
  )
};

