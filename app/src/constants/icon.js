import {TiDeleteOutline, TiDelete} from 'react-icons/ti';
import {FaCheck} from 'react-icons/fa';
import {MdDeleteOutline, MdOutlineDeleteForever, MdDelete, MdDeleteForever} from 'react-icons/md';
import {LuMenu} from 'react-icons/lu';
import {IoIosSearch} from 'react-icons/io';
import {RiEditLine, RiEditFill} from 'react-icons/ri';
import {BsCapsulePill} from 'react-icons/bs';
import { IoCheckmarkOutline } from "react-icons/io5";

const baseStyle = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const iconTypes = {

    deleteIcon: TiDeleteOutline,
    // 삭제 아이콘
    deleteActiveIcon: TiDelete,
    // 속이 채워진 삭제 아이콘
    trashOutlineIcon: MdDeleteOutline,
    // 속이 빈 쓰레기통 
    trachOutlineActiveIcon: MdOutlineDeleteForever,
    // 속이 빈 쓰레기통(액티브)
    trashIcon: MdDelete,
    // 속이 채워진 쓰레기통
    trashActiveIcon: MdDeleteForever,
    // 속이 채워진 쓰레기통(액티브)
    checkIcon: FaCheck,
    // 체크 아이콘
    menuIcon: LuMenu,
    // 햄버거 모양 메뉴 아이콘
    searchIcon: IoIosSearch,
    // 검색 아이콘
    editIcon: RiEditLine,
    // edit 아이콘
    editActiveIcon: RiEditFill,
    // edit 아이콘(액티브)
    pillIcon: BsCapsulePill,
    // 알약 아이콘
    smCheckIcon: IoCheckmarkOutline
    // 작은 체크 아이콘
};
const iconSizes = {
    lg: {
      width: '24px',
      height: '24px',
    },
    md: {
      width: '20px',
      height: '20px',
    },
    sm: {
      width: '16px',
      height: '16px',
    },
  };

  export default { baseStyle, iconTypes, iconSizes };