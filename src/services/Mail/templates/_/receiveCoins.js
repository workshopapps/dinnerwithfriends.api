module.exports = `
<body style=" display: block; background: #F7F7FA;">

<table width="100%" cellspacing=0 cellpadding=0 style="background: #fff; max-width: 640px; margin: auto; border-top: 5px solid #2FB47C; padding: 48px;">
    <thead style="word-break: break-word;">
    <tr>
        <td style="padding-bottom: 56px;">
            <img src="{{ platform.logo }}" alt="[LOGO]" style="height: 40px"/>
        </td>
    </tr>
    <tr>
        <td style="padding-bottom: 24px; font-size: 28px; color: #374072; font-weight: bold;">
            Hi {{ user.first_name }},
        </td>
    </tr>
    <tr>
        <td style="padding-top: 24px; padding-bottom: 24px; font-size: 20px; color: #374072; font-weight: bold;">
            You have received some money :)
        </td>
    </tr>
    <tr>
        <td style="font-weight: bold; font-size: 24px; color: #2FB47C; background-color: #F2F2F2; padding: 13px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
            {{ coin }} {{ amount }}
        </td>
    </tr>
    </thead>


    <tbody style="background: #F2F2F2; word-break: break-word;">
    <tr >
        <td style="width: 100%; padding-top: 24px; padding-left: 16px; padding-right: 16px; padding-top: 16px; padding-bottom: 16px; font-size: 18px; color: #646A86;">
            <p style="font-size: 13px; color: #646A86;">
                Amount
            </p>
            <p style="font-size: 16px; color: #005674;">
                {{ coin }} + {{ amount }}
            </p>
        </td>
    </tr>

    <tr>
        <td style="width: 100%; padding-top: 24px; padding-left: 16px; padding-right: 16px; padding-top: 16px; padding-bottom: 16px; font-size: 18px; color: #646A86;">
            <p style="font-size: 13px; color: #646A86;">
                Approximate value
            </p>
            <p style="font-size: 16px; color: #005674;">
                {{ amount_usd_equivalent }}
            </p>
        </td>
    </tr>
<!--    <tr>-->
<!--        <td style="width: 100%; padding-top: 24px; padding-left: 16px; padding-right: 16px; padding-top: 16px; padding-bottom: 16px; font-size: 18px; color: #646A86;">-->
<!--            <p style="font-size: 13px; color: #646A86;">-->
<!--                Fee-->
<!--            </p>-->
<!--            <p style="font-size: 16px; color: #005674;">-->
<!--                {{ coin }} {{ fee }}-->
<!--            </p>-->
<!--        </td>-->
<!--    </tr>-->

    <tr>
        <td style="width: 100%; padding-top: 24px; padding-left: 16px; padding-right: 16px; padding-top: 16px; padding-bottom: 16px; font-size: 18px; color: #646A86;">
            <p style="font-size: 13px; color: #646A86;">
                Balance
            </p>
            <p style="font-size: 16px; color: #005674;">
                {{ coin }} {{ balance }}
            </p>
        </td>
    </tr>
<!--    <tr>-->
<!--        <td style="width: 100%; padding-top: 24px; padding-left: 16px; padding-right: 16px; padding-top: 16px; padding-bottom: 16px; font-size: 18px; color: #646A86;">-->
<!--            <p style="font-size: 13px; color: #646A86;">-->
<!--                Sender-->
<!--            </p>-->
<!--            <p style="font-size: 16px; color: #005674;">-->
<!--                3Dq9LvHKKsBXKDrf3i6a4Jy5neLkzvJvqR-->
<!--            </p>-->
<!--        </td>-->
<!--    </tr>-->

    <tr>
        <td style="width: 100%; padding-top: 24px; padding-left: 16px; padding-right: 16px; padding-top: 16px; padding-bottom: 16px; font-size: 18px; color: #646A86;">
            <p style="font-size: 13px; color: #646A86;">
                Transaction
            </p>
            <p style="font-size: 16px; color: #005674;">
                {{ blockchain_hash }}
            </p>
        </td>
    </tr>
    </tbody>

</table>

</body>
`;