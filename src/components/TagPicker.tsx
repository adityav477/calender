import { useState } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from './ui/input'
import { Label } from '@radix-ui/react-label'
import { tagPickerInterface } from '@/types/event'
import { DialogTitle } from '@radix-ui/react-dialog'

interface tagPickerProps {
  isTagPickerOpen: boolean,
  onClickTagPicker: (newTag: tagPickerInterface) => void
  onCloseTagPicker: () => void
}

function TagPicker({ isTagPickerOpen, onClickTagPicker, onCloseTagPicker }: tagPickerProps) {
  const [newTag, setNewTag] = useState<tagPickerInterface>({
    name: '',
    color: ''
  });

  return (
    <Dialog open={isTagPickerOpen} onOpenChange={onCloseTagPicker}>
      <DialogTitle>
        New Tag
      </DialogTitle>
      <DialogContent>
        <Label htmlFor='tagName'>Enter Tag Name</Label>
        <Input
          type='text'
          id='tagName'
          value={newTag.name}
          onChange={e => setNewTag(prevValue => ({ ...prevValue, name: e.target.value }))}
        />

        <Label htmlFor="colorPicker">Select Color</Label>
        <Input
          type='color'
          id='colorPicker'
          value={newTag.color}
          onChange={e => setNewTag(prevValue => ({ ...prevValue, color: e.target.value }))}
        />

        <button
          type='submit'
          className='bg-gray-300 px-4 py-2 rounded-lg'
          onClick={() => {
            onClickTagPicker(newTag)
            onCloseTagPicker();
          }}
        >
          Add Tag
        </button>
      </DialogContent>
    </Dialog>
  )
}

export default TagPicker
