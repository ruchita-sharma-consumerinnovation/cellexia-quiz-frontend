import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { translations } from "@/utils/translations"

interface LanguageSelectorProps {
  language: string
  setLanguage: (language: string) => void
}

export function LanguageSelector({ language, setLanguage }: LanguageSelectorProps) {
  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={
            translations[language as keyof typeof translations].languageSelector
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="fr">Français</SelectItem>
        <SelectItem value="nl">Dutch</SelectItem>
        <SelectItem value="da">Danish</SelectItem>
        <SelectItem value="es">Español</SelectItem>
      </SelectContent>
    </Select>
  );
}