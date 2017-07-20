using System;
using System.Collections.Generic;
using System.Windows.Forms;
using System.Xml;

namespace ResultsParser
{
    public static class XmlCreation
    {
        public static void XmlCreate(Dictionary<string, Tuple<int, string>> _dict, string pathFileName, string suite, string description)
        {
            XmlTextWriter writer = new XmlTextWriter((pathFileName +"_cases"), System.Text.Encoding.UTF8);
            writer.WriteStartDocument(true);
            writer.Formatting = Formatting.Indented;
            writer.Indentation = 2;
            writer.WriteStartElement("sections");
            createNode(suite, description, _dict, writer);
            writer.WriteEndElement();
            writer.WriteEndDocument();          
            writer.Close();
            MessageBox.Show("XML File created ! ");
        }

        private static void createNode(string name,string description, Dictionary<string, Tuple<int, string>> _dict ,XmlTextWriter writer)
        {
            writer.WriteStartElement("section");
            writer.WriteStartElement("name");            
            writer.WriteString(name);
            writer.WriteEndElement();
            writer.WriteStartElement("description");
            writer.WriteString(description);
            writer.WriteEndElement();
            writer.WriteStartElement("cases");
            
            foreach (var elem in _dict.Keys)
            {
                writer.WriteStartElement("case");
                writer.WriteStartElement("title");
                var testCase = (elem.Length > 250 )? elem.Remove(240) : elem;
                writer.WriteString(testCase.Trim());
                writer.WriteEndElement();
                writer.WriteEndElement();
            }            
            writer.WriteEndElement();
            writer.WriteEndElement();
        }
    }
}
