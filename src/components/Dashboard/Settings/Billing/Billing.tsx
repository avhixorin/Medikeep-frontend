import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

const Billing: React.FC = () => {
  const { t } = useTranslation();
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="container max-w-screen-lg py-6 bg-transparent">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">{t("settings.billing.title1")}</h2>
          <p className="text-sm text-muted-foreground">
          {t("settings.billing.text1")}
          </p>
        </div>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-md font-medium">{t("settings.billing.title2")}</h3>
            <p className="text-sm text-muted-foreground">
            {t("settings.billing.text2")} <strong className='dark:text-white text-black'>{user?.settingPreferences?.billing.plan} Plan</strong>.
            </p>
            <Button size="sm" variant="secondary">
            {t("settings.billing.changePlan")}
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-medium">{t("settings.billing.paymentMethod")}</h3>
            <p className="text-sm text-muted-foreground">
            {t("settings.billing.text3")}
            </p>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder={t("settings.billing.enterNew")}
              />
              <Button size="sm">{t("settings.billing.updatePayment")}</Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-medium">{t("settings.billing.billingHistory")}</h3>
            <p className="text-sm text-muted-foreground">
            {t("settings.billing.text4")}
            </p>
            <Button size="sm" variant="outline">
            {t("settings.billing.viewHistory")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
