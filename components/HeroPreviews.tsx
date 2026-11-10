// Превью материалов на первом экране: промпт, бот-парсер и чек-лист (вёрстка, не картинки)
export function HeroPreviews() {
  return (
    <div className="hero-previews" aria-hidden>
      <div className="mock mock-prompt">
        <div className="mock-bar"><i /><i /><i /><span>Промпт · концепция сайта</span></div>
        <div className="mock-body">
          <p className="mock-role">Ты — арт-директор. Собери концепцию сайта для</p>
          <p><b>{"{ниша}"}</b> с аудиторией <b>{"{аудитория}"}</b></p>
          <p className="mock-muted">1. Логика страниц</p>
          <p className="mock-muted">2. Визуальное направление в тоне <b>{"{тон}"}</b></p>
          <p className="mock-muted">3. Проверка результата</p>
        </div>
      </div>

      <div className="mock mock-chat">
        <div className="mock-chat-head"><span className="mock-bot">AL</span><div><b>AuditLead_Bot</b><small>бот</small></div></div>
        <div className="mock-chat-body">
          <span className="bubble bubble-me">стоматология Казань</span>
          <span className="bubble">Ищу компании без сайта с Telegram в контактах…</span>
          <span className="bubble bubble-file"><em>CSV</em><span><b>база_стоматология.csv</b><small>телефон · Telegram · email</small></span></span>
        </div>
      </div>

      <div className="mock mock-check">
        <small>Чек-лист вёрстки с AI</small>
        <ul>
          <li className="done">Проверка структуры</li>
          <li className="done">Проверка интерфейса</li>
          <li className="done">Адаптив</li>
          <li>Финальный прогон</li>
        </ul>
      </div>
    </div>
  );
}
