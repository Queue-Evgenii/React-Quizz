import "./TextInput.css";

export const TextInput = (props: Props) => {
  return (
    <div className="mb-4">
      { props.name ? (
        <label htmlFor={ props.name } className="block text-xl mb-3">{ props.name }</label>
      ) : (
        <></>
      ) }
      <input
        id={ props.name }
        type="text"
        className="text-input"
        placeholder={ props.placeholder ? props.placeholder : undefined }
        onChange={ (e) => props.onChange(e.target.value) }
      />
    </div>
  );
}

export const NumberInput = (props: NumberProps) => {
  return (
    <div className="mb-4">
      { props.name ? (
        <label htmlFor={ props.name } className="block text-xl mb-3">{ props.name }</label>
      ) : (
        <></>
      ) }
      <input
        id={ props.name }
        type="number"
        min={ props.min ? props.min : undefined }
        max={ props.max ? props.max : undefined }
        className="text-input"
        defaultValue={ props.value ? parseInt(props.value) : 1 }
        placeholder={ props.placeholder ? props.placeholder : undefined }
        onChange={ (e) => {
          if (Number.isNaN(parseInt(e.target.value))) {
            props.onChange("1");
            e.target.value = "1";
            return;
          }
          props.onChange(e.target.value);
        } }
      />
    </div>
  );
}

export const TextareaInput = (props: Props) => {
  return (
    <div className="mb-4">
      { props.name ? (
        <label htmlFor={ props.name } className="block text-xl mb-3">{ props.name }</label>
      ) : (
        <></>
      ) }
      <textarea
        id={ props.name }
        className="text-input"
        placeholder={ props.placeholder ? props.placeholder : undefined }
        onChange={ (e) => props.onChange(e.target.value) }
      />
    </div>
  );
}

type Props = {
  name?: string,
  placeholder?: string,
  onChange: (value: string) => void,
  value?: string,
}
type NumberProps = Props & {
  min?: number,
  max?: number,
};