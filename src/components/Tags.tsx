import { useEffect, useState } from 'react';
import IndividualTags from './IndividualTags';
import { Plus } from 'lucide-react';
import TagPicker from './TagPicker';

interface tagsInterface {
  name: string,
  color: string,
}

interface tagsPropsInterface {
  onTagSubmit: (tagColor: string) => void;
}

function Tags({ onTagSubmit }: tagsPropsInterface) {
  const [tags, setTags] = useState<tagsInterface[]>(() => {
    const storedTags = localStorage.getItem("tags");
    return storedTags ? JSON.parse(storedTags) : []
  });

  const [isTagPickerOpen, setTagPicker] = useState<boolean>(false);
  const [tagClicked, setTagClicked] = useState<string>();

  const onClickTagPicker = (newTag: tagsInterface) => {
    console.log("new Tag is ", newTag);
    setTags(prevTags => [...prevTags, newTag]);
  }

  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags))
  }, [tags])

  return (
    <div>
      {isTagPickerOpen &&
        <div>
          <TagPicker isTagPickerOpen={isTagPickerOpen} onClickTagPicker={onClickTagPicker} onCloseTagPicker={() => setTagPicker(prevValue => !prevValue)} />
        </div>
      }
      <div className='flex gap-2'>
        {tags?.map((tag) => (
          <span key={tag.name} onClick={() => setTagClicked(tag.name)} className={tagClicked === tag.name ? "rounded-lg border-2 border-gray-300" : " "}>
            <IndividualTags name={tag.name} color={tag.color} onClick={onTagSubmit} />
          </span>
        ))}
      </div>
      <div onClick={() => setTagPicker(prevValue => !prevValue)}>
        <Plus strokeWidth={2} size={20} />
      </div>
    </div>
  )
}

export default Tags
