import './styles.scss';

export default function Input({ label, ...props }) {
  return (
    <div className='input-container'>
      <label className='input-label' htmlFor={props.id}>
        {label}
      </label>
      <input
        {...props}
        className='input-element'
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}
