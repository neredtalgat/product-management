import { createContext, useContext, useState, type ReactNode } from 'react'
import { Alert, Snackbar } from '@mui/material'

type Severity = 'success' | 'error'

interface NotificationContextValue {
    notify: (message: string, severity?: Severity) => void
}

const NotificationContext = createContext<NotificationContextValue | null>(null)

export const NotificationProvider = ({children}: {children: ReactNode}) => {
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [severity, setSeverity] = useState<Severity>('success')

    const notify = (msg: string, sev: Severity = 'success') => {
        setMessage(msg)
        setSeverity(sev)
        setOpen(true)
    }

    return(
        <NotificationContext.Provider value={{notify}}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            >
                <Alert severity={severity} onClose={() => setOpen(false)}>
                    {message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const ctx = useContext(NotificationContext)
    if (!ctx) throw new Error('useNotification must be used within NotificationProvider')
    return ctx.notify
}
