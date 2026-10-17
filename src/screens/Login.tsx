import React from 'react';
import { useLocation } from 'wouter';
import { Button, Checkbox, Input } from '../components';
import { useAuthStore } from '../stores/auth';
import dogImage from '../assets/petsy-dog.png';
import logoImage from '../assets/petsy-logo-transparent.png';
import iconImage from '../assets/petsy-icon-transparent.png';

// Login screen — matches the reference image.
const { TOKENS: T2, I: Ic2 } = window;

export const DEFAULT_LOGIN_USER = {
  email: 'test@example.com',
  password: 'password',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginScreen() {
  const [, setLocation] = useLocation();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = React.useState(DEFAULT_LOGIN_USER.email);
  const [pass, setPass] = React.useState(DEFAULT_LOGIN_USER.password);
  const [showPass, setShowPass] = React.useState(false);
  const [remember, setRemember] = React.useState(true);
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [submitError, setSubmitError] = React.useState('');

  const validate = React.useCallback(() => {
    const nextEmail = email.trim();
    const nextEmailError = EMAIL_RE.test(nextEmail) ? '' : 'Please enter a valid email address.';
    const nextPasswordError =
      pass.length >= 6 ? '' : 'Password must be at least 6 characters long.';

    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);

    return {
      isValid: !nextEmailError && !nextPasswordError,
      normalizedEmail: nextEmail,
    };
  }, [email, pass]);

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      setSubmitError('');

      const { isValid, normalizedEmail } = validate();
      if (!isValid) return;

      try {
        login(normalizedEmail, pass);
        setLocation('/dashboard');
      } catch (error) {
        setSubmitError('Unable to sign in right now. Please try again.');
      }
    },
    [login, pass, setLocation, validate]
  );

  return (
    <div
      className="petsy flex h-full w-full flex-col bg-gradient-to-b from-bg to-bg-deep"
      data-screen-label="01 · Login"
    >
      {/* paw print decorations */}
      <div className="absolute left-6 top-[90px] opacity-[0.18]">
        <PetsyMark size={26} color={T2.pink} />
      </div>
      <div className="absolute right-[30px] top-[180px] opacity-[0.12]">
        <PetsyMark size={32} color={T2.pink} />
      </div>
      <div className="absolute right-[70px] top-[60px] opacity-[0.18]">
        <PetsyMark size={18} color={T2.pink} />
      </div>

      {/* logo + headline */}
      <div className="px-8 pt-7 text-center">
        <img
          src={iconImage}
          alt=""
          className="mx-auto mb-4 block h-[54px] w-[54px] object-contain"
        />
        <img src={logoImage} alt="Petsy" className="mx-auto block h-[34px] object-contain" />
        <h2 className="mb-[5px] mt-3.5 font-display text-[26px] font-semibold tracking-[-0.2px] text-[#56524e]">
          Welcome back!
        </h2>
        <p className="mt-1 font-body text-[13px] font-medium leading-[1.5] text-ink2">
          Log in to continue caring
          <br />
          for your furry friends <span className="text-pink">♥</span>
        </p>
      </div>

      {/* hero illustration */}
      <div className="relative mb-[-20px] mt-3 flex min-h-[200px] flex-1 items-end justify-center">
        <div className="relative flex h-[180px] w-[220px] items-end justify-center overflow-hidden">
          <img
            src={dogImage}
            alt="Happy pet"
            className="h-full w-full object-contain object-bottom"
          />
        </div>
      </div>

      {/* form sheet */}
      <form
        onSubmit={handleSubmit}
        className="rounded-t-[36px] bg-surface px-[22px] pb-7 pt-6 shadow-sheet"
      >
        <div className="flex flex-col gap-3">
          <Input
            icon={<Ic2.mail />}
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError('');
              if (submitError) setSubmitError('');
            }}
            onBlur={validate}
            style={emailError ? { borderColor: '#D1556E' } : undefined}
          />
          {emailError ? (
            <div className="-mt-1.5 text-xs font-semibold text-danger">{emailError}</div>
          ) : null}

          <Input
            icon={<Ic2.lock />}
            type={showPass ? 'text' : 'password'}
            placeholder="Password"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
              if (passwordError) setPasswordError('');
              if (submitError) setSubmitError('');
            }}
            onBlur={validate}
            trailing={
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="flex text-ink3"
              >
                {showPass ? <Ic2.eyeOff /> : <Ic2.eye />}
              </button>
            }
            style={passwordError ? { borderColor: '#D1556E' } : undefined}
          />
          {passwordError ? (
            <div className="-mt-1.5 text-xs font-semibold text-danger">{passwordError}</div>
          ) : null}

          <div className="mt-1 flex items-center justify-between px-1">
            <Checkbox checked={remember} onChange={setRemember} label="Remember me" />
            <span className="cursor-pointer text-[13px] font-bold text-pink">Forgot password?</span>
          </div>

          {submitError ? (
            <div className="text-xs font-semibold text-danger">{submitError}</div>
          ) : null}

          <Button
            full
            type="submit"
            size="lg"
            iconRight={<Ic2.paw size={18} color="#fff" />}
            style={{ marginTop: 8 }}
          >
            Log In
          </Button>

          {/* divider */}
          <div className="mb-1 mt-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs font-semibold text-ink3">or</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          {/* create account */}
          <button
            type="button"
            className="flex h-[54px] w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-[1.5px] border-line bg-surface text-[15px] font-bold text-ink2"
          >
            <Ic2.user size={18} color={T2.pink} />
            Create account
          </button>
        </div>
      </form>
    </div>
  );
}

window.LoginScreen = LoginScreen;
