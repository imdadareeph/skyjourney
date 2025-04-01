import { useToast } from "@/components/ui/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast 
            key={id} 
            {...props} 
            className="bg-white border-2 shadow-lg opacity-100"
            style={{ backgroundColor: 'white', opacity: 1 }}
          >
            <div className="grid gap-1">
              {title && <ToastTitle className="text-black opacity-100">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-black opacity-100">{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
