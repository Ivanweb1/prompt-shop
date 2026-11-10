// Путь к файлу из public/ с учётом адреса сайта (свой домен или /prompt-shop на GitHub Pages)
export const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
