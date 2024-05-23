import "./RadioInput.css";

export const RadioInput = (props: Props) => {
  return (
    <div className="flex gap-x-1 mb-4">
      <input id={ props.id } type="radio" name={ props.for } className="radio-input"/>
      <label htmlFor={ props.id } className="radio-label">{ props.name }</label>
    </div>
  );
}

type Props = {
  id: string,
  for: string,
  name: string,
}