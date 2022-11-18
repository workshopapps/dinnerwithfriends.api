module.exports = `
<body style=" display: block; background: #F7F7FA;">
<table width="100%" style="background: #fff; max-width: 640px; margin: auto; border-top: 5px solid #2FB47C; padding: 48px;">
    <thead>
    <tr>
        <td style="padding-bottom: 56px;">
            <img src="{{ platform.logo }}" alt="[LOGO]" style="height: 40px"/>
        </td>
    </tr>
    <tr>
        <td style="padding-top: 24px; padding-bottom: 24px; font-size: 20px; color: #374072; font-weight: bold;">
            Hi {{ user.first_name }},
        </td>
    </tr>
    </thead>

    <tbody>
    <tr>
        <td style="padding-top: 24px; font-size: 18px; color: #646A86;">
            <p>
                Congratulations!!!! Your level 3 verification is successful. Your transaction limit has been increased and you can now carry out transactions above &#8358;10m.
            </p>
        </td>
    </tr>
    </tbody>
</table>
</body>
`;