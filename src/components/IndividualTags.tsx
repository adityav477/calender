interface individualTagsProps {
  name: string,
  color: string,
  onClick: (name: string) => void
}

function IndividualTags({ name, color, onClick }: individualTagsProps) {
  return (
    <div className='rounded-lg px-2 py-1 my-2'
      style={{
        color: color,
        backgroundColor: `hsl(from ${color} h s calc(l + 40))`
      }
      }
      onClick={() => onClick(color)}
    >
      {name}
    </div >
  )
}

export default IndividualTags; 
