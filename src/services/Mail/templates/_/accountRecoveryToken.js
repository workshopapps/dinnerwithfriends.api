module.exports = `
<body style=" display: block; background: #F7F7FA;">
<table width="100%" style="background: #fff; max-width: 640px; margin: auto; border-top: 5px solid #2FB47C; padding: 48px;">
    <thead>
    <tr>
        <td style="padding-bottom: 56px;">

        </td>
    </tr>
    <tr>
        <td style="padding-bottom: 24px; font-size: 28px; color: #374072; font-weight: bold;">
            Account Recovery!
        </td>
    </tr>
    </thead>

    <tbody>
    <tr>
        <td style="font-weight: bold; font-size: 24px; color: #2FB47C; background-color: #F2F2F2; padding: 13px; display: flex; align-items: center; justify-content: center;">
            {{ code }}
        </td>
    </tr>
    <tr>
        <td style="padding-top: 24px; font-size: 18px; color: #646A86;">
            <p>
                Kindly use the code above to complete your account recovery.
            </p>
            <p>
                It will expire in 30 minutes:
            </p>
        </td>
    </tr>
    </tbody>
</table>
</body>

`;
