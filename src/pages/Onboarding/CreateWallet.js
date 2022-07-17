import React, { useContext, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import randomNumber from 'lodash/random';

import { AppContext } from '../../AppProvider';
import { useNavigation, withParams } from '../../routes/hooks';
import { ROUTES_MAP as APP_ROUTES_MAP } from '../../routes/app-routes';
import { ROUTES_MAP } from './routes';
import clipboard from '../../utils/clipboard';
import { createAccount } from '../../utils/wallet';

import theme from '../../component-library/Global/theme';
import GlobalLayout from '../../component-library/Global/GlobalLayout';
import GlobalBackTitle from '../../component-library/Global/GlobalBackTitle';
import GlobalInput from '../../component-library/Global/GlobalInput';
import GlobalText from '../../component-library/Global/GlobalText';
import GlobalButton from '../../component-library/Global/GlobalButton';
import GlobalPadding from '../../component-library/Global/GlobalPadding';
import GlobalPageDot from '../../component-library/Global/GlobalPageDot';
import GlobalDivider from '../../component-library/Global/GlobalDivider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: theme.gutters.paddingSM,
    paddingVertical: 40,
    maxWidth: theme.variables.mobileWidthLG,
    width: '100%',
    minHeight: '100%',
  },
  headerActions: {
    // width: '100%',
  },
  inner: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.gutters.paddingNormal,
    paddingBottom: theme.gutters.padding2XL,
  },
  footerActions: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    marginVertical: theme.gutters.paddingXL,
    width: 56,
    height: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textAreaWrapper: {
    width: '100%',
    height: 284,
  },
  inputWrapper: {
    width: '90%',
  },
});

const Message = ({ onNext, onBack }) => (
  <>
    <View style={styles.headerActions}>
      <GlobalBackTitle onBack={() => onBack()} />
    </View>

    <View style={styles.inner}>
      <GlobalDivider />

      <GlobalText type="headline2" center>
        Keep your seed safe!
      </GlobalText>

      <GlobalText type="body1" center>
        Your private keys are only stored on your current computer or device.
        You will need these words to restore your wallet if your browser's
        storage is cleared or your device is damaged or lost.
      </GlobalText>
    </View>

    <View style={styles.footerActions}>
      <GlobalButton type="primary" wide title="Continue" onPress={onNext} />
    </View>
  </>
);

const Form = ({ account, onComplete, onBack }) => (
  <>
    <View style={styles.headerActions}>
      <GlobalBackTitle onBack={() => onBack()}>
        <View style={styles.pagination}>
          <GlobalPageDot active />
          <GlobalPageDot />
          <GlobalPageDot />
        </View>
      </GlobalBackTitle>
    </View>

    <View style={styles.inner}>
      <GlobalText type="headline2" center>
        Your Seed Phrase
      </GlobalText>

      <GlobalText type="body1" center>
        Your private keys are only stored on your current computer or device.
        You will need these words to restore your wallet.
      </GlobalText>

      <GlobalPadding size="xl" />

      <GlobalInput
        value={account.mnemonic}
        readonly
        seedphrase
        multiline
        numberOfLines={8}
        complete={false}
        invalid={false}
      />
    </View>

    <View style={styles.footerActions}>
      <GlobalButton
        type="secondary"
        wide
        title="Copy Key"
        onPress={() => clipboard.copy(account.mnemonic)}
      />

      <GlobalPadding size="md" />

      <GlobalButton
        type="primary"
        wide
        title="I´ve backed up seed phrase"
        onPress={onComplete}
      />
    </View>
  </>
);

const ValidateSeed = ({ account, onComplete, onBack }) => {
  const [positions, setPositions] = useState([]);
  const [phrases, setPhrases] = useState(['', '', '']);
  useEffect(() => {
    const length = account.mnemonic.split(' ').length;
    const random = [
      randomNumber(1, Math.floor(length / 3)),
      randomNumber(Math.floor(length / 3) + 1, Math.floor(length / 3) * 2),
      randomNumber(Math.floor(length / 3) * 2 + 1, length),
    ];
    setPositions(random);
  }, [account]);
  const isValid = useMemo(
    () =>
      positions.every(
        (pos, index) => phrases[index] === account.mnemonic.split(' ')[pos - 1],
      ),
    [positions, phrases, account],
  );
  const setPhrasePos = (value, index) =>
    setPhrases([
      ...[...phrases].splice(0, index),
      value,
      ...[...phrases].splice(index + 1, phrases.length),
    ]);
  return (
    <>
      <View style={styles.headerActions}>
        <GlobalBackTitle onBack={() => onBack()}>
          <View style={styles.pagination}>
            <GlobalPageDot />
            <GlobalPageDot active />
            <GlobalPageDot />
          </View>
        </GlobalBackTitle>
      </View>

      <View style={styles.inner}>
        <GlobalText type="headline2" center>
          Confirm Seed Phrase
        </GlobalText>

        <GlobalText type="body1" center>
          Prese re-enter seed phrase to confirm tha you have save it
        </GlobalText>

        <GlobalPadding size="2xl" />

        {positions.map((pos, index) => (
          <React.Fragment key={`phrase-${pos}`}>
            <GlobalInput
              startLabel={pos}
              placeholder={'Enter Word #' + pos}
              setValue={value => setPhrasePos(value, index)}
              // value={phrases[index]}
              value={account.mnemonic.split(' ')[pos - 1]}
              complete={false}
              invalid={false}
            />
            <GlobalPadding />
          </React.Fragment>
        ))}
      </View>

      <View style={styles.footerActions}>
        <GlobalButton
          type={isValid ? 'primary' : 'secondary'}
          wide
          title="Continue"
          onPress={onComplete}
          disabled={isValid}
        />
      </View>
    </>
  );
};

const Password = ({ onComplete, onBack, requiredLock, checkPassword }) => {
  const [pass, setPass] = useState('');
  const [repass, setRepass] = useState('');
  const [wrongpass, setWrongpass] = useState(false);
  const isValid =
    (!requiredLock && ((!!pass && pass === repass) || (!pass && !repass))) ||
    (requiredLock && pass);
  const onContinue = async () => {
    if (requiredLock) {
      const result = await checkPassword(pass);
      if (!result) {
        setWrongpass(true);
      } else {
        onComplete(pass);
      }
    } else {
      onComplete(pass);
    }
  };

  return (
    <>
      <View style={styles.headerActions}>
        <GlobalBackTitle onBack={() => onBack()}>
          <View style={styles.pagination}>
            <GlobalPageDot />
            <GlobalPageDot />
            <GlobalPageDot active />
          </View>
        </GlobalBackTitle>
      </View>
      {requiredLock && (
        <View style={styles.inner}>
          <GlobalText type="headline2" center>
            Insert password
          </GlobalText>
          <GlobalPadding size="2xl" />

          <GlobalInput
            placeholder="Password"
            value={pass}
            setValue={setPass}
            complete={false}
            invalid={wrongpass}
            autoComplete="password-new"
          />
        </View>
      )}
      {!requiredLock && (
        <View style={styles.inner}>
          <GlobalText type="headline2" center>
            Choose a Password
          </GlobalText>

          <GlobalText type="body1" center>
            Prese re-enter seed phrase to confirm tha you have save it
          </GlobalText>

          <GlobalPadding size="2xl" />

          <GlobalInput
            placeholder="New Password"
            value={pass}
            setValue={setPass}
            complete={false}
            invalid={false}
            autoComplete="password-new"
          />

          <GlobalPadding />

          <GlobalInput
            placeholder="Repeat New Password"
            value={repass}
            setValue={setRepass}
            complete={false}
            invalid={false}
            autoComplete="password-new"
          />
        </View>
      )}
      <View style={styles.footerActions}>
        <GlobalButton
          type="secondary"
          wide
          title="Create Wallet"
          onPress={onContinue}
          disabled={!isValid}
        />
      </View>
    </>
  );
};

const CreateWallet = ({ params }) => {
  const navigate = useNavigation();
  const [
    { selectedEndpoints, requiredLock, wallets },
    { addWallet, checkPassword },
  ] = useContext(AppContext);
  const [step, setStep] = useState(1);
  const [account, setAccount] = useState(null);
  useEffect(() => {
    if (!account) {
      createAccount(params.chainCode, selectedEndpoints[params.chainCode]).then(
        d => {
          setAccount(d);
        },
      );
    }
  }, [selectedEndpoints, account, params.chainCode]);
  const handleOnPasswordComplete = async password => {
    await addWallet(account, password, params.chainCode);
    navigate(APP_ROUTES_MAP.WALLET);
  };
  return (
    <GlobalLayout>
      <View style={styles.container}>
        {step === 1 && (
          <Message
            onNext={() => setStep(2)}
            onBack={() => navigate(ROUTES_MAP.ONBOARDING_HOME)}
          />
        )}
        {step === 2 && (
          <Form
            account={account}
            onComplete={() => setStep(3)}
            onBack={() => setStep(1)}
          />
        )}
        {step === 3 && (
          <ValidateSeed
            account={account}
            onComplete={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}
        {step === 4 && (
          <Password
            onComplete={handleOnPasswordComplete}
            onBack={() => setStep(3)}
            requiredLock={requiredLock}
            checkPassword={checkPassword}
          />
        )}
      </View>
    </GlobalLayout>
  );
};

export default withParams(CreateWallet);
