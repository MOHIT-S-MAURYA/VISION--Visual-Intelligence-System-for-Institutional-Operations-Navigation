// Shared UI Components
export { Button, type ButtonProps } from './Button';
export { Input, type InputProps } from './Input';
export { Textarea, type TextareaProps } from './Textarea';
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from './Select';
export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from './Card';
export { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  type ModalProps 
} from './Modal';
export { 
  Loader, 
  LoadingOverlay, 
  InlineLoader, 
  type LoaderProps 
} from './Loader';
export { Badge, type BadgeProps } from './Badge';
export { 
  Alert, 
  AlertTitle, 
  AlertDescription, 
  type AlertProps 
} from './Alert';
export { ErrorBoundary } from './ErrorBoundary';
export { 
  LoadingSpinner, 
  FullPageLoader, 
  PageLoadingFallback, 
  LoadingSkeleton 
} from './LoadingSpinner';

// Import components for re-export
import { Button } from './Button';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';
import { Card } from './Card';
import { Modal } from './Modal';
import { Loader } from './Loader';
import { Badge } from './Badge';
import { Alert } from './Alert';

// Re-export commonly used components for convenience
export const UI = {
  Button,
  Input,
  Textarea,
  Select,
  Card,
  Modal,
  Loader,
  Badge,
  Alert,
} as const;

export default UI;