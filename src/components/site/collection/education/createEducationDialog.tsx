import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { BsPlus } from 'react-icons/bs';

const CreateEducationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="info" size="sm">
          <BsPlus /> Create new user
        </Button>
      </DialogTrigger>
        <DialogContent>
            hello
        </DialogContent>
      
    </Dialog>
  )
}

export default CreateEducationDialog
