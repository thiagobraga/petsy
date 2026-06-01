import React from 'react';
import { useLocation } from 'wouter';
import { Button, Checkbox, Input, PetsyMark } from '../components';
import { useAuthStore } from '../stores/auth';
import dogImage from '../assets/petsy-dog.png';

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
      className="petsy"
      data-screen-label="01 · Login"
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `linear-gradient(180deg, ${T2.bg} 0%, ${T2.bgDeep} 100%)`,
      }}
    >
      {/* paw print decorations */}
      <div style={{ position: 'absolute', top: 90, left: 24, opacity: 0.18 }}>
        <PetsyMark size={26} color={T2.pink} />
      </div>
      <div style={{ position: 'absolute', top: 180, right: 30, opacity: 0.12 }}>
        <PetsyMark size={32} color={T2.pink} />
      </div>
      <div style={{ position: 'absolute', top: 60, right: 70, opacity: 0.18 }}>
        <PetsyMark size={18} color={T2.pink} />
      </div>

      {/* logo + headline */}
      <div style={{ padding: '24px 32px 0', textAlign: 'center' }}>
        <div style={{ marginBottom: 16 }}>
          <PetsyMark size={48} color={T2.pink} />
        </div>
        <h1
          style={{
            fontSize: 40,
            marginTop: 0,
            letterSpacing: -0.5,
            fontWeight: 800,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Ic2.heart size={16} color={T2.pink} />
          PETSY
        </h1>
        <h2 style={{ fontSize: 28, marginTop: 14, fontWeight: 700 }}>Welcome back!</h2>
        <p
          style={{ fontSize: 15, color: T2.ink2, marginTop: 8, lineHeight: 1.45, fontWeight: 500 }}
        >
          Log in to continue caring
          <br />
          for your furry friends <span style={{ color: T2.pink }}>♥</span>
        </p>
      </div>

      {/* hero illustration */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginTop: 12,
          minHeight: 200,
        }}
      >
        <div
          style={{
            width: 220,
            height: 180,
            borderRadius: '50% 50% 12px 12px',
            background: `radial-gradient(circle at 50% 30%, ${T2.pinkSoft} 0%, ${T2.pinkPale} 100%)`,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src={dogImage}
            alt="Happy pet"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom center',
            }}
          />
          {/* paw confetti */}
          <div style={{ position: 'absolute', top: 16, left: -12, opacity: 0.5 }}>
            <PetsyMark size={20} color={T2.rose} />
          </div>
          <div style={{ position: 'absolute', top: 60, right: -16, opacity: 0.5 }}>
            <PetsyMark size={16} color={T2.rose} />
          </div>
        </div>
      </div>

      {/* form sheet */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: T2.surface,
          borderTopLeftRadius: 36,
          borderTopRightRadius: 36,
          padding: '24px 22px 28px',
          boxShadow: '0 -10px 30px rgba(58,38,32,0.06)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
            <div style={{ marginTop: -6, fontSize: 12, color: T2.danger, fontWeight: 600 }}>
              {emailError}
            </div>
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
                style={{ color: T2.ink3, display: 'flex' }}
              >
                {showPass ? <Ic2.eyeOff /> : <Ic2.eye />}
              </button>
            }
            style={passwordError ? { borderColor: '#D1556E' } : undefined}
          />
          {passwordError ? (
            <div style={{ marginTop: -6, fontSize: 12, color: T2.danger, fontWeight: 600 }}>
              {passwordError}
            </div>
          ) : null}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 4,
              padding: '0 4px',
            }}
          >
            <Checkbox checked={remember} onChange={setRemember} label="Remember me" />
            <span style={{ fontSize: 13, color: T2.pink, fontWeight: 700, cursor: 'pointer' }}>
              Forgot password?
            </span>
          </div>

          {submitError ? (
            <div style={{ fontSize: 12, color: T2.danger, fontWeight: 600 }}>{submitError}</div>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '10px 0 2px' }}>
            <div style={{ flex: 1, height: 1, background: T2.border }} />
            <span style={{ fontSize: 12, color: T2.ink3, fontWeight: 600 }}>or continue with</span>
            <div style={{ flex: 1, height: 1, background: T2.border }} />
          </div>

          {/* social */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
            <SocialButton kind="google" />
            <SocialButton kind="apple" />
            <SocialButton kind="facebook" />
          </div>

          <div
            style={{
              textAlign: 'center',
              marginTop: 8,
              fontSize: 13,
              color: T2.ink2,
              fontWeight: 500,
            }}
          >
            New here?{' '}
            <span style={{ color: T2.pink, fontWeight: 700, cursor: 'pointer' }}>
              Create account
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

function SocialButton({ kind }) {
  const logo = {
    google: (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <path
          d="M19.6 10.2c0-.7-.1-1.3-.2-2H10v3.8h5.4c-.2 1.2-.9 2.3-2 3l3.2 2.5c1.9-1.7 3-4.3 3-7.3z"
          fill="#4285F4"
        />
        <path
          d="M10 20c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.8-5.6-4.1L1.1 14.3C2.7 17.7 6.1 20 10 20z"
          fill="#34A853"
        />
        <path
          d="M4.4 11.9C4.2 11.3 4.1 10.7 4.1 10s.1-1.3.3-1.9L1.1 5.7C.4 7 0 8.5 0 10s.4 3 1.1 4.3l3.3-2.4z"
          fill="#FBBC04"
        />
        <path
          d="M10 4c1.5 0 2.8.5 3.8 1.5l2.9-2.9C15 1 12.7 0 10 0 6.1 0 2.7 2.3 1.1 5.7l3.3 2.4C5.2 5.8 7.4 4 10 4z"
          fill="#EA4335"
        />
      </svg>
    ),
    apple: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="#1A1A1A">
        <path d="M13.8 10.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.9-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2-1.1 2.8-2.3.9-1.3 1.2-2.6 1.2-2.7 0 0-2.4-.9-2.4-3.6zM11.5 3.6c.6-.8 1.1-1.9.9-3-1 0-2.2.6-2.8 1.4-.5.7-1.1 1.8-1 2.9 1.1.1 2.3-.6 2.9-1.3z" />
      </svg>
    ),
    facebook: (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <path
          d="M20 10C20 4.5 15.5 0 10 0S0 4.5 0 10c0 5 3.7 9.1 8.4 9.9V13H5.9v-3h2.5V7.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V10h2.8l-.4 3h-2.3v6.9C16.3 19.1 20 15 20 10z"
          fill="#1877F2"
        />
      </svg>
    ),
  }[kind];
  return (
    <button
      type="button"
      style={{
        height: 52,
        borderRadius: 16,
        background: T2.surface,
        border: `1.5px solid ${T2.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {logo}
    </button>
  );
}

window.LoginScreen = LoginScreen;
