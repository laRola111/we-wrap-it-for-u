export const getMessages = async (locale) => {
    try {
      const messages = await import(`./messages/${locale}.json`);
      return messages.default;
    } catch {
      return {};
    }
  };
  