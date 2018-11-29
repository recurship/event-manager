import PropTypes from 'prop-types';

export const ModalBodyTypes = {
  eventForm: PropTypes.object,
  onSubmit: PropTypes.func,
  registered: PropTypes.bool,
  toggle: PropTypes.func,
};

export const EventSignupModalTypes = {
  eventForm: PropTypes.object,
  dispatch: PropTypes.func,
};

export const EventSignupFormTypes = {
  valid: PropTypes.bool,
  onSubmit: PropTypes.func,
  fields: PropTypes.array,
  registered: PropTypes.bool,
  toggle: PropTypes.func,
};

export const LoaderTypes = {
  isFetching: PropTypes.bool,
};
