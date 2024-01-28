import { cva } from 'class-variance-authority';

const alert = cva(
  'flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
  {
    variants: {
      type: {
        danger: 'text-red-800 bg-red-50',
        info: 'text-blue-800 bg-blue-50',
        success: 'text-green-800 bg-green-50',
        warning: 'text-yellow-800 bg-yellow-50',
      },
    },
    defaultVariants: {
      type: 'info',
    },
  },
);

interface AlertProps {
  type: 'danger' | 'info' | 'success' | 'warning';
  content: string;
}

export const Alert = ({ content, type }: AlertProps) => {
  return (
    <div className="absolute right-7 bottom-7 z-50">
      <div className={alert({ type })} role="alert">
        <svg
          className="flex-shrink-0 inline w-4 h-4 me-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div>{content}</div>
      </div>
    </div>
  );
};
