import { Button, Flex, Icon, Input, Text, useToast } from "@chakra-ui/react";
import {
  IoIosArrowBack as IcBack,
  IoIosArrowForward as IcNext,
} from "react-icons/io";
import {
  HiOutlineChevronDoubleLeft as IcFirst,
  HiOutlineChevronDoubleRight as IcLast,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import Notification, { setToastParams } from "../../helpers/Notification";
import { useSearchParams } from "react-router-dom";

const mainContainer = {
  w: "full",
  justifyContent: "center",
};

const container = {
  direction: "row",
  gap: 2,
  alignItems: "center",
};

function Pagination({ maxPage, currentPage, setCurrentPage }) {
  const [tmpPage, setTmpPage] = useState(currentPage);
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParams = searchParams.get("page") || 1;
  const toast = useToast();

  function handleResetPage() {
    setTmpPage(pageParams);
  }

  useEffect(() => {
    handleResetPage();
  }, [pageParams]);

  function handlePageClick(page) {
    setTmpPage(page);
    setCurrentPage((prev) => {
      prev.set("page", page);
      return prev;
    });
  }

  function handleOnChange(event) {
    const page = parseInt(event.target.value);
    setTmpPage(page);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      if (tmpPage >= 1 && tmpPage <= maxPage) return handlePageClick(tmpPage);
      return Notification(toast, { title: "Invalid Page", status: 500 });
    }
  }

  function handlePrevClick() {
    if (currentPage > 1) handlePageClick(+currentPage - 1);
  }

  function handleNextClick() {
    if (currentPage < maxPage) handlePageClick(+currentPage + 1);
  }

  const buttonPrev = {
    children: <Icon as={IcBack} />,
    onClick: handlePrevClick,
    variant: "solid",
    isDisabled: currentPage <= 1 ? true : false,
  };

  const buttonNext = {
    children: <Icon as={IcNext} />,
    onClick: handleNextClick,
    variant: "solid",
    isDisabled: currentPage >= maxPage ? true : false,
  };

  const buttonFirst = {
    children: <Icon as={IcFirst} />,
    onClick: () => handlePageClick(1),
    variant: "solid",
    isDisabled: currentPage <= 1 ? true : false,
  };

  const buttonLast = {
    children: <Icon as={IcLast} />,
    onClick: () => handlePageClick(maxPage),
    variant: "solid",
    isDisabled: currentPage >= maxPage ? true : false,
  };

  const inputNumber = {
    w: "48px",
    type: "number",
    variant: "outline",
    color: "textPrimary",
    placeholder: "Page",
    textAlign: "center",
    value: Math.min(tmpPage, maxPage),
    _hover: {
      color: "textReversePrimary",
      bgColor: "textPrimary",
    },
    onChange: handleOnChange,
    onKeyDown: handleKeyDown,
  };

  const numOfPages = {
    children: `of ${maxPage}`,
  };

  return (
    <Flex {...mainContainer}>
      <Flex {...container}>
        <Button {...buttonFirst} />
        <Button {...buttonPrev} />
        <Input {...inputNumber} />
        <Text {...numOfPages} />
        <Button {...buttonNext} />
        <Button {...buttonLast} />
      </Flex>
    </Flex>
  );
}

export default Pagination;
