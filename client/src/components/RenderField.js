import React from 'react';

const renderField = ({
	input,
	placeholder,
	type,
	meta: { touched, error, warning },
}) => (
	<div className="form-group">
		<input
			{...input}
			placeholder={placeholder}
			type={type}
			className="form-control"
		/>
		{touched &&
			((error && <span className="text-danger">{error}</span>) ||
				(warning && <span>{warning}</span>))}
	</div>
);
export default renderField;
