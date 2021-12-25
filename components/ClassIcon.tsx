/* eslint-disable @next/next/no-img-element */
import { Tag } from '@/models'

const icons: Readonly<Record<Tag, JSX.Element>> = {
  [Tag.Fighter]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" clipRule="evenodd" viewBox="0 0 64 64">
      <path fill="none" d="M-.0002 0h63.9999v64H-.0002z"/>
      <path d="m32.17874972 5.919-2.58599596 5.477 2.58599596 2.247 2.76299568-2.247-2.76299568-5.477ZM19.72876917 6.905l1.63499745 5.919 3.29699485.284.98599846-3.244-5.91799076-2.959ZM44.63566643 6.905l-1.63499745 5.919-3.29699485.284-.98599846-3.244 5.91799076-2.959ZM22.68776455 23.674l-2.95899538 6.906 6.29499017 9.864-2.34899633 9.864 8.51898669 8.37 9.23598557-8.37L37.48474143 32l-9.86498459-.434-.03799994-2.486h3.4549946l1.51499764-2.032v-1.401l-9.86398459-1.973Z"/>
      <path d="M35.51174451 28.607c2.66499584-.168 4.42899308 1.187 5.35999163 3.945l2.1139967-1.602V19.729l-18.97997035-3.946-.33099948.986v3.946l13.21397935 1.973-1.37699785 5.919ZM58.36064498 50.562016v1.973l-5.83299088 5.919-7.89198767-6.905-2.95899538-10.851c5.45399148 6.713 11.55698194 11.576 16.68397393 9.864ZM6.00379062 50.308v1.973L11.8367815 58.2l7.89198767-6.905 2.95899538-10.851c-5.45399148 6.713-11.55698194 11.576-16.68397393 9.864ZM54.25371523 5.919c-.81199873 7.378-3.15099508 12.702-7.89098767 14.796V32c-1.13099824 1.646-2.85299554 3.123-4.9329923 4.498l.98699846 1.973c2.6299959-2.739 5.26099178-2.68 7.89098767 0 7.80298781-6.969 12.01098124-16.089 3.94599384-32.552ZM9.86378459 5.919c.30499952 7.326 5.44899148 14.431 9.86498458 15.783l-3.94599383 9.864 3.94599383 4.932c-2.48699611-.326-4.07099364.402-4.93199229 1.973-9.55098508-5.969-11.516982-17.298-4.9329923-32.552Z"/>
    </svg>
  ),
  [Tag.Tank]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" clipRule="evenodd" viewBox="0 0 64 64">
      <path fill="none" d="M-.0002 0h63.9999v64H-.0002z"/>
      <path d="M5.99979062 14.5 9.99978437 42 28.9997547 58c2.26999645 1.132 4.44199306 1.196 6.49998984 0l19.49996953-16 3.49999453-27.5L35.99974375 6h-7.49998828L5.99979062 14.5Zm3.75799413 2.215L29.1207545 9.4h6.25799022l19.40896967 7.332-2.98999532 23.497L33.5927475 55.166c-.87899863.429-1.7929972.35-2.74399571-.055-.003-.001-17.6699724-14.879-17.6699724-14.879L9.75778476 16.715Z"/>
      <path d="m15.999775 21.5 9.49998516-5v3h13.99997812v-3l8.99998594 7-2.4999961 9.5-7.49998828 2.5V32H25.99975937v3.5L18.4997711 33 15.999775 21.5ZM27.99975625 16h8.49998672l-4.24999336-5-4.24999336 5ZM35.49974453 42.5V56H28.9997547V42.5h-4.49999297V37H39.9997375v5.5h-4.49999297Z"/>
    </svg>
  ),
  [Tag.Mage]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" clipRule="evenodd" viewBox="0 0 64 64">
      <path fill="none" d="M-.0002 0h63.9999v64H-.0002z"/>
      <path d="M31.99975 46.5c12.99997969-18 13.99997812-10.5 0-32.5-3.08099519 4.356-8.10498734-.816-.49999922-8-6.05099054 1.267-13.39497907 6.401-7.49998828 16.5l3.99999375-2c-7.49998828 13-8.49998672 9.5 3.99999375 26Zm-1.17599816-20.126c-.5129992.897-1.0259984 1.794-1.5399976 2.69l-1.41599778 2.487c.1199998.259.48999923 1.033.85399866 1.596.78699877 1.219 1.86699708 2.665 3.2629949 4.49 1.280998-1.61 2.36299631-2.917 3.23799494-4.033.5839991-.746 1.2229981-1.743 1.46299772-2.125-.05799991-.16-.14399978-.383-.21999966-.543-.3139995-.655-.74699883-1.39-1.28899798-2.256-.80099875-1.281-1.80799718-2.788-3.02399528-4.617l-1.32899792 2.311Z"/>
      <path d="M5.4997914 47.5 7.9997875 40c11.7129817-.388 19.73796916 3.582 23.9999625 12 5.03699213-8.692 13.02797964-12.799 24.49996172-11.5l1.99999687 7c-11.09798266-1.44-18.34497133 1.158-22.49996484 7h4.49999297v4H23.49976328v-4h4.99999219c-4.23499338-6.647-12.83397995-7.808-22.99996406-7Z"/>
    </svg>
  ),
  [Tag.Assassin]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" clipRule="evenodd" viewBox="0 0 64 64">
      <path fill="none" d="M-.0002 0h63.9999v64H-.0002z"/>
      <path d="m32.00000532 30.00008-5.4999914-5.25c-6.15699039 3.999-7.51998826 10.251-2.4999961 19.5l-6.99998906-8.5c-1.20399812 7.943.72799886 15.412 8.49998671 22-12.46498052-5.308-21.60396624-13.021-19.99996875-28.5l5.49999141 4c8.56598662-6.582 12.4179806-13.248 11.49998203-20 5.96599068-10.509 12.12798105-10.761 18.4999711 0-.91799857 6.752 2.93399541 13.418 11.49998203 20l5.4999914-4c1.6039975 15.479-7.53498822 23.192-19.99996875 28.5 7.77198786-6.588 9.70398484-14.057 8.49998672-22l-6.99998906 8.5c5.01999216-9.249 3.65699429-15.501-2.4999961-19.5l-4.99999218 5.25Z"/>
      <path d="M31.7500057 57.75 37.49999673 48l-1.99999687-3c3.23499495-5.166 4.18699346-9.482 2.99999531-13-1.04699836 3.868-2.65299585 6.953-4.99999219 9h-3.49999453c-2.34699633-2.047-3.95299382-5.132-4.99999218-9-1.18699815 3.518-.23499964 7.834 2.9999953 13l-1.99999687 3 5.74999102 9.75Z"/>
    </svg>
  ),
  [Tag.Support]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" clipRule="evenodd" viewBox="0 0 64 64">
      <path fill="none" d="M-.0002 0h63.9999v64H-.0002z"/>
      <path d="M54.4992042 6.08144c-.16999973 9.397-4.3459932 16.361-13.99997812 20l-2.4999961 14c3.5939944 8.339 12.5459804-.798 4.49999298-4 2.29399641-3.754 5.1809919-5.335 8.99998593-3.5l2.4999961-2.081-3.99999375-1.5h4.99999218l3.49999454-6.419-5.49999141-2 5.99999062-.5c.4519993-5.317-.8879986-10.037-4.49999296-14ZM10.4997836 6c.16999973 9.397 4.3459932 16.361 13.99997812 20l2.4999961 14c-3.5939944 8.339-12.5459804-.798-4.49999298-4-2.29399641-3.754-5.1809919-5.335-8.99998593-3.5l-2.99999532-3 4.49999297-2H8.99978594l-2.4999961-5 5.49999141-2-5.99999063-.5c-.45199929-5.317.88799862-10.037 4.49999297-14Z"/>
      <path d="m35.99974375 8.5 3.49999453 9-4.99999219 13V45l2.99999532 8.5-2.99999532 5h-3.99999375l-2.9999953-5 2.9999953-8.5V30.5l-4.99999218-13 3.49999453-9h6.99998906Zm-1.99999688 5 1.49999766 4-2.99999531 7.5-2.99999531-7.5 1.49999765-4h2.99999531Z"/>
    </svg>
  ),
  [Tag.Marksman]: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" clipRule="evenodd" viewBox="0 0 64 64">
      <path fill="none" d="M-.0002 0h63.9999v64H-.0002z"/>
      <path d="m32.2494943 28 5.24999179-6c6.73298948 3.694 9.7909847 3.299 9.3439854-1 7.13998884 6.636 10.34298384 12.906 11.65598179 19-2.74599571-3.51-6.86798927-6.138-12.9999797-7.48-1.57399753 3.312-4.25799334 5.793-7.9999875 7.48l.99999844-5.559 2.558996-2.441h-4.55899287l-2.99999531 16 4.55499288 5.502L37.49948609 59l-5.2499918-2.552L26.9995025 59l-.55499913-5.498L30.99949624 48l-2.9999953-16h-4.55899289l2.558996 2.441L26.9995025 40c-3.74199415-1.687-6.42598996-4.168-7.9999875-7.48C12.86752458 33.862 8.74553102 36.49 5.99953531 40c1.31299794-6.094 4.51599294-12.364 11.65598178-19-.4469993 4.299 2.61099592 4.694 9.3439854 1l5.2499918 6Z"/>
      <path d="M32.21574966 6.081 27.99975625 17.5l4.21599341 5 4.2839933-5-4.2839933-11.419ZM17.99977187 11.5l2.4999961 8h3.99999375l.99999844-3.5-7.49998829-4.5ZM46.49947202 11.5l-2.49999609 8h-3.99999375l-.99999844-3.5 7.49998828-4.5Z"/>
    </svg>
  ),
}

const ClassIcon = ({ tag }: { tag: Tag }) => {
  return icons[tag]
}

export default ClassIcon
