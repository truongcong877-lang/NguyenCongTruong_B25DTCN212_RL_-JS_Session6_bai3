let memberCard = "";
let memberRank = "";
let lockerZone = "";
let towelCount = 0;
let lockCount = 0;
let isMemberValid = false;
let hasSupplies = false;

const towelPrice = 20000;
const lockPrice = 15000;
const depositPerItem = 50000;

do {
    console.log(`
========================================
        FITNESS GYM - LOGISTICS
========================================
1. Xác thực thẻ hội viên
2. Ghi nhận vật tư mượn thêm
3. In phiếu bàn giao
4. Đóng ca và thoát
========================================
`);

    const choice = prompt("Nhập lựa chọn: ").trim();

    switch (choice) {
        case "1":
            memberCard = prompt("Nhập thẻ hội viên (VD: GYM-VIP-2026): ").trim().toUpperCase();

            if (memberCard.startsWith("GYM-VIP-") || memberCard.startsWith("GYM-STANDARD-")) {
                const cardParts = memberCard.split("-");

                memberRank = cardParts[1];

                if (memberRank === "VIP") {
                    lockerZone = "ZONE-A";
                } else {
                    memberRank = "STANDARD";
                    lockerZone = "ZONE-B";
                }

                isMemberValid = true;

                console.log(`
Xác thực thành công!
Hạng hội viên : ${memberRank}
Khu vực tủ     : ${lockerZone}
`);
            } else {
                isMemberValid = false;

                console.log(`
Thẻ hội viên không hợp lệ!
Mã phải có dạng:
GYM-VIP-...
hoặc
GYM-STANDARD-...
`);
            }

            break;

        case "2":
            if (!isMemberValid) {
                console.log("\nVui lòng xác thực thẻ hội viên trước!");
                break;
            }

            const supplyLog = prompt("Nhập vật tư (VD: TOWEL:2|LOCK:1): ").trim().toUpperCase();

            towelCount = 0;
            lockCount = 0;

            let remaining = supplyLog;

            while (remaining.length > 0) {
                const separatorIndex = remaining.indexOf("|");
                let item;

                if (separatorIndex === -1) {
                    item = remaining;
                    remaining = "";
                } else {
                    item = remaining.slice(0, separatorIndex);
                    remaining = remaining.slice(separatorIndex + 1);
                }

                const colonIndex = item.indexOf(":");

                if (colonIndex !== -1) {
                    const itemName = item.slice(0, colonIndex);
                    const quantity = Number(
                        item.slice(colonIndex + 1)
                    );

                    if (itemName === "TOWEL" && quantity > 0) {
                        towelCount += quantity;
                    }

                    if (itemName === "LOCK" && quantity > 0) {
                        lockCount += quantity;
                    }
                }
            }

            hasSupplies = towelCount > 0 || lockCount > 0;

            console.log(`
Đã ghi nhận vật tư:
Khăn tắm : ${towelCount}
Khóa tủ  : ${lockCount}
`);

            break;

        case "3":
            if (!isMemberValid) {
                console.log("\nChưa xác thực hội viên. Không thể cấp phát tủ!");
                break;
            }

            const freeTowel = memberRank === "VIP" ? 1 : 0;
            const extraTowel = Math.max(0, towelCount - freeTowel);
            const supplyFee = extraTowel * towelPrice + lockCount * lockPrice;
            const totalItems =towelCount + lockCount;
            const deposit =hasSupplies ? totalItems * depositPerItem : 0;
            const border = "=".repeat(45);

            console.log(`
${border}
            PHIẾU BÀN GIAO
${border}
Thẻ hội viên : ${memberCard}
Hạng         : ${memberRank}
Tủ khu vực   : ${lockerZone}
---------------------------------------------
Khăn tắm     : ${towelCount}
Khóa tủ phụ  : ${lockCount}
---------------------------------------------
Phí vật tư   : ${supplyFee} VNĐ
Tiền cọc     : ${deposit} VNĐ
---------------------------------------------
TỔNG THU     : ${(supplyFee + deposit)} VNĐ
${border}
`);

            if (memberRank === "VIP") {
                console.log("VIP: Được miễn phí 1 khăn tắm lớn.");
            }

            console.log("Tiền cọc được hoàn lại khi hội viên trả đủ vật tư.");

            break;

        case "4":
            console.log(`
ĐÓNG CA LÀM VIỆC
Đã hoàn tất xử lý hậu cần.
Tạm biệt!
`);
            break;

        default:
            console.log("\nLựa chọn không hợp lệ! Vui lòng chọn 1 đến 4.");
    }

    if (choice === "4") {
        break;
    }

} while (true);