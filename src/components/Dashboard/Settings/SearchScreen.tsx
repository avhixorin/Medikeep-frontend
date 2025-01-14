import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SearchItems = [
  {
    title: "settings.navItems.general",
    href: "/dashboard/settings/general",
    items: [
      "settings.general.photo",
      "settings.general.name",
      "settings.general.email",
      "settings.general.theme",
      "settings.general.language",
      "settings.general.accountPrivacy",
    ],
  },
  {
    title: "settings.navItems.security",
    href: "/dashboard/settings/security",
    items: [
      "settings.security.password",
      "settings.security.title2",
      "settings.security.title4",
      "settings.security.title5",
    ],
  },
  {
    title: "settings.navItems.billing",
    href: "/dashboard/settings/billing",
    items: ["settings.billing.title2", "settings.billing.changePlan", "settings.billing.paymentMethod", "settings.billing.billingHistory", "settings.billing.updatePayment"],
  },
  {
    title: "settings.navItems.notifications",
    href: "/dashboard/settings/notifications",
    items: ["settings.notifications.title2", "settings.notifications.title3", "settings.notifications.title4", "settings.notifications.title5", "settings.notifications.title6", "settings.notifications.title7", "settings.notifications.title8"],
  },
  {
    title: "settings.navItems.sharing",
    href: "/dashboard/settings/sharing",
    items: ["settings.sharing.title2", "settings.sharing.title3", "settings.sharing.title4", "settings.sharing.sendInvite" ],
  },
];

type SearchScreenProps = {
  searchText: string;
  setSearch: (searchText: string) => void;
};

const SearchScreen: React.FC<SearchScreenProps> = ({ searchText, setSearch }) => {
  const { t } = useTranslation();

  const filteredItems = SearchItems.filter(
    (item) =>
      t(item.title).toLowerCase().includes(searchText.toLowerCase()) ||
      item.items.some((subItem) =>
        t(subItem).toLowerCase().includes(searchText.toLowerCase())
      )
  );
  const navigate = useNavigate(); 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 dark:text-gray-200 text-gray-700 rounded-lg p-6 shadow-xl w-full max-w-lg max-h-96 overflow-y-auto scrollbar-webkit">
        <h2 className="text-xl font-bold text-center mb-6">{t("settings.header.searchResults")}</h2>
        {filteredItems.length > 0 ? (
          <ul className="space-y-6">
            {filteredItems.map((item) => (
              <li key={item.title}>
                <p className="text-lg font-semibold mb-2">{t(item.title)}</p>
                <ul className="space-y-2 pl-4">
                  {item.items.map((subItem) => (
                    <li key={subItem}>
                      <button
                        className="text-sm text-gray-600 dark:text-gray-300 hover:dark:text-gray-200 hover:text-gray-800"
                        onClick={() => {
                          setSearch("");
                          navigate(item.href);
                        }}
                      >
                        {t(subItem)}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {t("settings.header.noResults")}
          </p>
        )}
        <button
          className="mt-6 w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600"
          onClick={() => setSearch("")}
        >
          {t("settings.header.close")}
        </button>
      </div>
    </div>
  );
};

export default SearchScreen;
