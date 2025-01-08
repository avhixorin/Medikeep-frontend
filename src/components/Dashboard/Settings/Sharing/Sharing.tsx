import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

const Sharing: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="container max-w-screen-lg py-6 bg-transparent">
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium">{t("settings.sharing.title1")}</h2>
          <p className="text-sm text-muted-foreground">
          {t("settings.sharing.text1")}
          </p>
        </div>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-md font-medium">{t("settings.sharing.title2")}</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                {t("settings.sharing.text2")}
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                {t("settings.sharing.text2B")}
                </p>
              </div>
              <Switch />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-medium">{t("settings.sharing.title3")}</h3>
            <p className="text-sm text-muted-foreground">
            {t("settings.sharing.text3")}
            </p>
            <Button size="sm" variant="secondary">
            {t("settings.sharing.manageLinked")}
            </Button>
          </div>
          <div className="space-y-2">
            <h3 className="text-md font-medium">{t("settings.sharing.title4")}</h3>
            <p className="text-sm text-muted-foreground">
            {t("settings.sharing.text4")}
            </p>
            <div className="flex items-center space-x-2">
              <Input type="text" placeholder={t("settings.sharing.enterEmail")} />
              <Button size="sm">{t("settings.sharing.sendInvite")}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sharing;
