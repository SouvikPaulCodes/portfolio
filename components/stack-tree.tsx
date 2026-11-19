import { skills } from '@/data/site'

export function StackTree() {
  return (
    <div className="font-mono text-sm">
      <p aria-hidden="true" className="text-fg">
        stack/
      </p>
      <ul className="tree mt-1">
        {skills.map(({ group, items }) => (
          <li key={group} className="sm:grid sm:grid-cols-[11ch_minmax(0,1fr)] sm:gap-x-[1ch]">
            <h3 className="text-accent">{group}</h3>
            <ul className="dot-list flex flex-wrap text-fg" aria-label={`${group} skills`}>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
