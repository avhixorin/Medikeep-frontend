import { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

const useCheckAvailability = (username: string, email: string) => {
  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const check = debounce(async () => {
    if (username || email) {
      const res = await axios.post(import.meta.env.VITE_CHECK_AVAILABILITY_URL, { username, email });
      setUsernameExists(res.data.usernameExists);
      setEmailExists(res.data.emailExists);
    }
  }, 500);

  useEffect(() => {
    check();
    return check.cancel;
  }, [username, email, check]);

  return { usernameExists, emailExists };
};

export default useCheckAvailability;
