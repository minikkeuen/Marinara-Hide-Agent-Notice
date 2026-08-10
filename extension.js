((marinara) => {
  "use strict";

  if (!marinara?.extension?.id || typeof marinara.onCleanup !== "function") {
    throw new Error("Hide Default Agent Notice requires Marinara Engine full-page extension access");
  }

  const NOTICE_RULES = [
    ["using the default agent connection"],
    ["agent calls may bill that provider"],
    ["image prompt writer failed:", "use retry failed agents in the agents menu to try again."],
    [
      "agents switched to",
      "the primary generation failed, so marinara retried with your configured fallback.",
    ],
  ];
  const HIDDEN_ATTRIBUTE = "data-hide-default-agent-notice";

  const style = document.createElement("style");
  style.dataset.hideDefaultAgentNotice = marinara.extension.id;
  style.textContent = `[${HIDDEN_ATTRIBUTE}="true"] { display: none !important; }`;
  document.head.append(style);

  const isTargetNotice = (element) => {
    if (!(element instanceof Element) || !element.matches("[data-sonner-toast]")) return false;
    const text = (element.textContent || "").toLowerCase();
    return NOTICE_RULES.some((rule) => rule.every((signature) => text.includes(signature)));
  };

  const hideTargetNotices = (root) => {
    if (isTargetNotice(root)) root.setAttribute(HIDDEN_ATTRIBUTE, "true");
    if (!(root instanceof Element || root instanceof Document)) return;
    root.querySelectorAll("[data-sonner-toast]").forEach((toast) => {
      if (isTargetNotice(toast)) toast.setAttribute(HIDDEN_ATTRIBUTE, "true");
    });
  };

  hideTargetNotices(document);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      const targetToast =
        mutation.target instanceof Element ? mutation.target.closest("[data-sonner-toast]") : null;
      if (targetToast && isTargetNotice(targetToast)) targetToast.setAttribute(HIDDEN_ATTRIBUTE, "true");

      for (const node of mutation.addedNodes) {
        if (node instanceof Element) hideTargetNotices(node);
      }
    }
  });

  observer.observe(document.body, { childList: true, characterData: true, subtree: true });
  marinara.onCleanup(() => {
    observer.disconnect();
    style.remove();
    document.querySelectorAll(`[${HIDDEN_ATTRIBUTE}]`).forEach((element) => {
      element.removeAttribute(HIDDEN_ATTRIBUTE);
    });
  });
})(marinara);
