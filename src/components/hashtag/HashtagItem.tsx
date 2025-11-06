type HastagItemProps = {
  company: string;
  onSelectCompany: (company: string) => void;}

export default function HashtagItem({company, onSelectCompany}: HastagItemProps) {
  return (
    <li key={company}><button onClick={() => onSelectCompany(company)}>#{company}</button></li>
  )
}
