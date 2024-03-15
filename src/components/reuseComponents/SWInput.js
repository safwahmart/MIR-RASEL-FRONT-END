export const SWLabel = ({ name, star }) => {
  return (
    <>
      <div className="sw__custom__input">
        <label>
          {name}
          <span>{star}</span>
        </label>
      </div>
    </>
  );
};

export const SWInput = ({
  type,
  value,
  placeholder,
  name,
  onChange,
  onBlur,
}) => {
  return (
    <>
      <div className="sw__custom__input">
        <input
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </>
  );
};
