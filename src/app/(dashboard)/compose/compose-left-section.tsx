import { connect } from "react-redux";

import TiptapEditor from "@/app/(dashboard)/compose/editor";

import { ComposeSetFields } from "@/store/compose/compose-action";

const ComposeLeftSection = (props: any) => {
  const onChangeMobile = (e: any) => {
    const key_name = e.target.name;
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (key_name === "mobile_number") {
      let newVal = parseInt(val);
      let preVal = parseInt(props.mobile_number);

      props.Compose_Set_Fields(
        e.target.name,
        newVal < 1 || newVal.toString().length > 10 ? preVal.toString() : val,
      );
    }
  };

  const setFields = (e: any) => {
    props.Compose_Set_Fields(e.target.name, e.target.value);
  };

  return (
    <div className="relative col-span-6 p-3 space-y-3 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">
            Recipient Email <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="to_sent"
            value={props.to_sent}
            className={`w-full border border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary`}
            onChange={setFields}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">
            Recipient Mobile Number <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="mobile_number"
            value={props.mobile_number}
            className={`w-full border border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary`}
            onChange={onChangeMobile}
          />
        </div>
      </div>
      <div className="grid grid-cols-1  gap-6 text-gray-800">
        <div className="flex flex-col gap-1">
          <label className="font-semibold text-sm">
            Subject <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={props.subject}
            className={`w-full border border-gray-300 py-2 px-3 text-sm rounded-md outline-none bg-gray-100 focus:border-primary`}
            onChange={setFields}
          />
        </div>
      </div>

      <div className="grid grid-cols-1  gap-6 text-gray-800 mt-11 h-140">
        <TiptapEditor
          content={props.mail_body ?? ""}
          onChange={(html) => props.Compose_Set_Fields("mail_body", html)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (store: any) => ({
  to_sent: store.compose_store.to_sent,
  subject: store.compose_store.subject,
  mail_body: store.compose_store.mail_body,
  error_info: store.compose_store.error_info,
  // profile_data: store.profile_store.profile_data,
  //   settings_data: store.login_store.settings_data,
  mobile_number: store.compose_store.mobile_number,
  compose_fields_error: store.compose_store.compose_fields_error,
});

const mapDispatchToProps = (dispatch: any) => ({
  Compose_Set_Fields: (name: any, value: any) =>
    dispatch(ComposeSetFields(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComposeLeftSection);
