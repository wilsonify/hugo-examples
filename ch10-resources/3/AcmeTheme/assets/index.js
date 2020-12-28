function addFormHandler() {
  document.querySelectorAll("[data-dynamic-form]")
    .forEach(async form => form.addEventListener('submit', async event => {
      event.preventDefault();
      const form = event.target;
      const data = new FormData(form);
      const action = form.action;
      const method = form.method;
      const response = await fetch(action, {
        method,
        body: data,
        headers: {"Accept": "application/json"}
      });
      if (response.ok) {
          form.insertAdjacentHTML('afterend',
            document.querySelector(form.dataset.success).innerHTML);
      } else {
        form.insertAdjacentHTML('afterend',
          document.querySelector(form.dataset.error).innerHTML);
      }
      const message = form.nextElementSibling;
      form.reset();
      setTimeout(() => message.remove(), 10000);
  }));
}

if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', addFormHandler);
} else {
  addFormHandler();
}